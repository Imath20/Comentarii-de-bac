import argparse
import os
import re
import sys
from pathlib import Path
from typing import Iterable, Optional, Tuple

import numpy as np
from PIL import Image

try:
    import cv2  # type: ignore
except ImportError as e:
    raise SystemExit(
        "❌ Lipsă dependență: opencv-python.\n"
        "Instalează: pip install opencv-python\n"
        f"Detalii: {e}"
    )

try:
    import pytesseract  # type: ignore
except ImportError as e:
    raise SystemExit(
        "❌ Lipsă dependență: pytesseract.\n"
        "Instalează: pip install pytesseract\n"
        f"Detalii: {e}"
    )


IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff", ".bmp"}


def _natural_key(path: Path) -> Tuple:
    """
    Sortează fișierele natural (poza-2 înainte de poza-10).
    """
    parts = re.split(r"(\d+)", path.name)
    key = []
    for p in parts:
        if p.isdigit():
            key.append(int(p))
        else:
            key.append(p.lower())
    return tuple(key)


def iter_images(folder: Path) -> Iterable[Path]:
    for p in sorted(folder.iterdir(), key=_natural_key):
        if p.is_file() and p.suffix.lower() in IMAGE_EXTS:
            yield p


def to_cv2_bgr(img: Image.Image) -> np.ndarray:
    # PIL -> OpenCV (BGR)
    if img.mode != "RGB":
        img = img.convert("RGB")
    rgb = np.array(img)
    return cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)


def deskew(gray: np.ndarray) -> np.ndarray:
    """
    Deskew simplu: estimează rotația din text (minAreaRect) și rotește.
    Funcționează bine pe pagini scanate cu înclinare mică.
    """
    # binarizare pentru detectarea conturului textului
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    thr = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    thr = 255 - thr  # text alb pe fundal negru pentru contururi

    coords = cv2.findNonZero(thr)
    if coords is None:
        return gray

    rect = cv2.minAreaRect(coords)
    angle = rect[-1]
    # OpenCV: unghiul e ciudat; aducem în [-45, 45]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle

    if abs(angle) < 0.2:
        return gray

    (h, w) = gray.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    return cv2.warpAffine(gray, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)


def preprocess_for_ocr(
    bgr: np.ndarray,
    *,
    upscale: float = 1.5,
    do_deskew: bool = True,
    enhance_contrast: bool = True,
) -> np.ndarray:
    """
    Preprocesare orientată OCR:
    - upscaling (ajută la font mic)
    - grayscale
    - denoise
    - (opțional) contrast (CLAHE)
    - threshold adaptiv + mici operații morfologice
    """
    if upscale and upscale != 1.0:
        bgr = cv2.resize(bgr, None, fx=upscale, fy=upscale, interpolation=cv2.INTER_CUBIC)

    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

    if do_deskew:
        gray = deskew(gray)

    # denoise blând
    gray = cv2.fastNlMeansDenoising(gray, None, h=12, templateWindowSize=7, searchWindowSize=21)

    if enhance_contrast:
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        gray = clahe.apply(gray)

    # binarizare robustă pentru pagini scanate/foto
    thr = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 35, 11
    )

    # curățăm puncte mici și întărim caracterele
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
    thr = cv2.morphologyEx(thr, cv2.MORPH_OPEN, kernel, iterations=1)
    thr = cv2.morphologyEx(thr, cv2.MORPH_CLOSE, kernel, iterations=1)
    return thr


def ocr_image(
    image_path: Path,
    *,
    lang: str = "ron",
    psm: int = 6,
    oem: int = 1,
    preserve_interword_spaces: int = 1,
    extra_config: str = "",
    upscale: float = 1.5,
    do_deskew: bool = True,
) -> str:
    img = Image.open(image_path)
    bgr = to_cv2_bgr(img)
    proc = preprocess_for_ocr(bgr, upscale=upscale, do_deskew=do_deskew)

    config = (
        f"--oem {oem} --psm {psm} "
        f"-c preserve_interword_spaces={preserve_interword_spaces} "
        f"{extra_config}".strip()
    )
    text = pytesseract.image_to_string(proc, lang=lang, config=config)
    return text


def ensure_tesseract_hint():
    # Pytesseract are nevoie de binarul tesseract instalat (și, pe Windows, uneori de path explicit).
    if os.name == "nt":
        # Heuristic: dacă nu e setat explicit și nu e găsit, dăm hint util.
        if not getattr(pytesseract.pytesseract, "tesseract_cmd", None):
            return


def main():
    # Fix encoding pentru Windows console (suport emoji)
    if sys.platform == "win32":
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8")
        if hasattr(sys.stderr, "reconfigure"):
            sys.stderr.reconfigure(encoding="utf-8")
    
    parser = argparse.ArgumentParser(
        description="OCR cu Tesseract (detaliat) pentru toate imaginile dintr-un folder."
    )
    parser.add_argument(
        "--input",
        default=r"public\Pdf- comentarii\Imagini\baltagul-comentariu-tema-si-viziunea",
        help="Folderul cu imagini (png/jpg/etc).",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Folderul de output pentru .txt. Implicit: public/Pdf- comentarii/Txt/<nume_folder>/",
    )
    parser.add_argument("--lang", default="ron", help="Limba Tesseract (ex: ron, ron+eng).")
    parser.add_argument("--psm", type=int, default=6, help="Tesseract PSM (ex: 6, 4, 11).")
    parser.add_argument("--oem", type=int, default=1, help="Tesseract OEM (1 = LSTM).")
    parser.add_argument(
        "--upscale",
        type=float,
        default=1.5,
        help="Upscale înainte de OCR (ex: 1.0, 1.5, 2.0).",
    )
    parser.add_argument(
        "--no-deskew",
        action="store_true",
        help="Dezactivează deskew (dacă unele pagini se strică).",
    )
    parser.add_argument(
        "--resume",
        action="store_true",
        help="Sare peste imaginile pentru care există deja .txt în output.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Procesează doar primele N imagini (util pentru test).",
    )
    parser.add_argument(
        "--tesseract-cmd",
        default=None,
        help=r'Pe Windows: calea către tesseract.exe (ex: "C:\Program Files\Tesseract-OCR\tesseract.exe").',
    )
    parser.add_argument(
        "--extra-config",
        default="",
        help='Config extra Tesseract (ex: "-c tessedit_char_blacklist=…").',
    )

    args = parser.parse_args()

    if args.tesseract_cmd:
        pytesseract.pytesseract.tesseract_cmd = args.tesseract_cmd
        # Setează TESSDATA_PREFIX automat dacă nu e deja setat
        if "TESSDATA_PREFIX" not in os.environ:
            tesseract_dir = Path(args.tesseract_cmd).parent
            tessdata_path = tesseract_dir / "tessdata"
            if tessdata_path.exists():
                os.environ["TESSDATA_PREFIX"] = str(tessdata_path)
            else:
                # Încearcă și varianta cu slash în loc de backslash
                tessdata_path_alt = Path(str(tesseract_dir).replace("\\", "/")) / "tessdata"
                if tessdata_path_alt.exists():
                    os.environ["TESSDATA_PREFIX"] = str(tessdata_path_alt)

    input_dir = Path(args.input)
    if not input_dir.exists():
        raise SystemExit(f"❌ Nu există folderul: {input_dir}")

    output_dir = Path(args.output) if args.output else Path("public") / "Pdf- comentarii" / "Txt" / input_dir.name
    output_dir.mkdir(parents=True, exist_ok=True)

    combined_path = output_dir / f"{input_dir.name}.txt"
    images = list(iter_images(input_dir))
    if args.limit is not None:
        images = images[: max(0, args.limit)]

    if not images:
        raise SystemExit(f"⚠️  Nu am găsit imagini în: {input_dir}")

    print(f"📁 Input:  {input_dir}")
    print(f"💾 Output: {output_dir}")
    print(f"🧠 Lang={args.lang} PSM={args.psm} OEM={args.oem} Upscale={args.upscale}")
    print(f"🧾 Total imagini: {len(images)}")

    combined_chunks = []
    for idx, img_path in enumerate(images, 1):
        out_txt = output_dir / f"{img_path.stem}.txt"
        if args.resume and out_txt.exists():
            print(f"⏭️  [{idx}/{len(images)}] skip (exists): {img_path.name}")
            text = out_txt.read_text(encoding="utf-8", errors="replace")
        else:
            print(f"🔎 [{idx}/{len(images)}] OCR: {img_path.name}")
            try:
                text = ocr_image(
                    img_path,
                    lang=args.lang,
                    psm=args.psm,
                    oem=args.oem,
                    extra_config=args.extra_config,
                    upscale=args.upscale,
                    do_deskew=(not args.no_deskew),
                )
            except pytesseract.TesseractNotFoundError:
                raise SystemExit(
                    "❌ Tesseract nu e instalat / nu e găsit.\n"
                    "Windows: instalează Tesseract OCR și pune-l în PATH sau dă --tesseract-cmd.\n"
                    'Ex: python tesseract_ocr_images.py --tesseract-cmd "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"\n'
                    "Apoi instalează și limba română (traineddata): ron."
                )
            out_txt.write_text(text, encoding="utf-8")

        combined_chunks.append(f"\n\n===== {img_path.name} =====\n\n{text.strip()}\n")

    combined_path.write_text("".join(combined_chunks).lstrip(), encoding="utf-8")
    print(f"\n✅ Gata. Fișier combinat: {combined_path}")


if __name__ == "__main__":
    main()


