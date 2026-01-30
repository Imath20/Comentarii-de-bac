import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

// Bundle JSON content at build time to avoid runtime fetch issues on Vercel
// Keys look like: '../data/opere/ion.json'
const BOOK_MODULES = import.meta.glob('../data/opere/*.json', { eager: true });

const BOOKS = {
  "amintiri-din-copilarie": {
    path: "/src/data/opere/amintiri_copilarie.json",
    title: "Amintiri din copilărie",
    bookmarkKey: "amintiri_copilarie_bookmark",
    maxWidth: "910px",
    width: "90vw"
  },
  "harap-alb": {
    path: "/src/data/opere/harap-alb.json",
    title: "Povestea lui Harap-Alb",
    bookmarkKey: "harap_alb_bookmark",
    maxWidth: "670px",
    width: "80vw"
  },
  "ion": {
    path: "/src/data/opere/ion.json",
    title: "Ion",
    bookmarkKey: "ion_bookmark",
    maxWidth: "490px",
    width: "80vw"
  },
  "mara": {
    path: "/src/data/opere/mara.json",
    title: "Mara",
    bookmarkKey: "mara_bookmark",
    maxWidth: "920px",
    width: "80vw"
  },
  "baltagul": {
    path: "/src/data/opere/baltagul.json",
    title: "Baltagul",
    bookmarkKey: "baltagul_bookmark",
    maxWidth: "860px",
    width: "80vw"
  },
  "moara-cu-noroc": {
    path: "/src/data/opere/moara-cu-noroc.json",
    title: "Moara cu noroc",
    bookmarkKey: "moara_cu_noroc_bookmark",
    maxWidth: "920px",
    width: "80vw"
  },
  "o-scrisoare-pierduta": {
    path: "/src/data/opere/o_scrisoare_pierduta.json",
    title: "O scrisoare pierdută",
    bookmarkKey: "o_scrisoare_pierduta_bookmark",
    maxWidth: "920px",
    width: "80vw"
  },
  "ultima-noapte-dragoste": {
    path: "/src/data/opere/ultima-noapte-dragoste.json",
    title: "Ultima noapte de dragoste, intiia noapte de razboi",
    bookmarkKey: "ultima_noapte_dragoste_bookmark",
    maxWidth: "570px",
    width: "80vw"
  },
  "luceafarul": {
    path: "/src/data/opere/luceafarul.json",
    title: "Lucefarul",
    bookmarkKey: "luceafarul_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "enigma-otiliei": {
    path: "/src/data/opere/enigma-otiliei.json",
    title: "Enigma Otiliei",
    bookmarkKey: "enigma-otiliei_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "riga-crypto": {
    path: "/src/data/opere/riga-crypto.json",
    title: "Riga Crypto şi Lapona Enigel",
    bookmarkKey: "riga-crypto_bookmark",
    maxWidth: "650px",
    width: "80vw"
  },
  "morometii": {
    path: "/src/data/opere/morometii.json",
    title: "Moromeţii",
    bookmarkKey: "morometii_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "iona": {
      path: "/src/data/opere/iona.json",
      title: "Iona",
      bookmarkKey: "iona_bookmark",
      maxWidth: "600px",
      width: "80vw"
  },
  "un-pedagog-de-scoala-noua": {
    path: "/src/data/opere/un-pedagog-de-scoala-noua.json",
    title: "Un pedagog de scoala noua",
    bookmarkKey: "un-pedagog-de-scoala-noua_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "critice": {
    path: "/src/data/opere/critice.json",
    title: "Critice",
    bookmarkKey: "critice_bookmark",
    maxWidth: "800px",
    width: "80vw"
  },
  "lapusneanu": {
    path: "/src/data/opere/lapusneanu.json",
    title: "Alexandru Lăpuşneanu",
    bookmarkKey: "lapusneanu_bookmark",
    maxWidth: "950px",
    width: "80vw"
  },
  "rascoala": {
    path: "/src/data/opere/rascoala.json",
    title: "Rascoala",
    bookmarkKey: "rascoala_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "hanul-ancutei": {
    path: "/src/data/opere/hanul-ancutei.json",
    title: "Hanul Ancutiei",
    bookmarkKey: "hanul-ancutei_bookmark",
    maxWidth: "730px",
    width: "80vw"
  },
  "maitreyi": {
    path: "/src/data/opere/maitreyi.json",
    title: "Maitreyi",
    bookmarkKey: "maitreyi_bookmark",
    maxWidth: "520px",
    width: "80vw"
  },
  "nunta-in-cer": {
    path: "/src/data/opere/nunta-in-cer.json",
    title: "Nunta in cer",
    bookmarkKey: "nunta-in-cer_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "amintiri-de-la-junimea-din-iasi": {
    path: "/src/data/opere/amintiri-de-la-junimea-din-iasi.json",
    title: "Amintiri de la Junimea din Iași",
    bookmarkKey: "amintiri-de-la-junimea-din-iasi_bookmark",
    maxWidth: "520px",
    width: "80vw",

    widthRules: [
      { spec: "603-", maxWidth: "600px"}
    ]
  },
  "amintiri-din-junimea": {
    path: "/src/data/opere/amintiri-din-junimea.json",
    title: "Amintiri din Junimea",
    bookmarkKey: "amintiri-din-junimea_bookmark",
    maxWidth: "550px",
    width: "80vw"
  },
  "bubico": {
    path: "/src/data/opere/bubico.json",
    title: "Bubico",
    bookmarkKey: "bubico_bookmark",
    maxWidth: "750px",
    width: "80vw"
  },
  "capra-cu-trei-iezi": {
    path: "/src/data/opere/capra-cu-trei-iezi.json",
    title: "Capra cu trei iezi",
    bookmarkKey: "capra-cu-trei-iezi_bookmark",
    maxWidth: "700px",
    width: "80vw"
  },
  "danila-prepeleac": {
    path: "/src/data/opere/danila-prepeleac.json",
    title: "Dănilă Prepeleac",
    bookmarkKey: "danila-prepeleac_bookmark",
    maxWidth: "830px",
    width: "80vw"
  },
  "i-l-caragiale-dl-goe": {
    path: "/src/data/opere/i-l-caragiale-dl-goe.json",
    title: "Dl. Goe",
    bookmarkKey: "i-l-caragiale-dl-goe_bookmark",
    maxWidth: "750px",
    width: "80vw"
  },
  "i-l-caragiale-vizita": {
    path: "/src/data/opere/i-l-caragiale-vizita.json",
    title: "Vizită",
    bookmarkKey: "i-l-caragiale-vizita_bookmark",
    maxWidth: "740px",
    width: "80vw"
  },
  "la-tiganci": {
    path: "/src/data/opere/la-tiganci.json",
    title: "La Țigănci",
    bookmarkKey: "la-tiganci_bookmark",
    maxWidth: "600px",
    width: "80vw"
  },
  "o-noapte-furtunoasa": {
    path: "/src/data/opere/o-noapte-furtunoasa.json",
    title: "O noapte furtunoasă",
    bookmarkKey: "o-noapte-furtunoasa_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "padurea-spanzuratilor": {
    path: "/src/data/opere/padurea-spanzuratilor.json",
    title: "Pădurea spânzuraților",
    bookmarkKey: "padurea-spanzuratilor_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "patul-lui-procust": {
    path: "/src/data/opere/patul-lui-procust.json",
    title: "Patul lui Procust",
    bookmarkKey: "patul-lui-procust_bookmark",
    maxWidth: "700px",
    width: "80vw"
  },
  "popa-tanda": {
    path: "/src/data/opere/popa-tanda.json",
    title: "Popa Tanda",
    bookmarkKey: "popa-tanda_bookmark",
    maxWidth: "330px",
    width: "80vw"
  },
  "ursul-pacalit-de-vulpe": {
    path: "/src/data/opere/ursul-pacalit-de-vulpe.json",
    title: "Ursul păcălit de vulpe",
    bookmarkKey: "ursul-pacalit-de-vulpe_bookmark",
    maxWidth: "800px",
    width: "80vw"
  },
  "viata-ca-o-prada": {
    path: "/src/data/opere/viata-ca-o-prada.json",
    title: "Viață ca o pradă",
    bookmarkKey: "viata-ca-o-prada_bookmark",
    maxWidth: "900px",
    width: "80vw"
  },
  "pacala-in-satul-lui": {
    path: "/src/data/opere/pacala-in-satul-lui.json",
    title: "Păcală în satul lui",
    bookmarkKey: "pacala-in-satul-lui_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "limir-imparat": {
    path: "/src/data/opere/limir-imparat.json",
    title: "Limir-împărat",
    bookmarkKey: "limir-imparat_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "doi-feti-cu-stea": {
    path: "/src/data/opere/doi-feti-cu-stea.json",
    title: "Doi feti cu stele",
    bookmarkKey: "doi-feti-cu-stea_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "petrea-prostul": {
    path: "/src/data/opere/petrea-prostul.json",
    title: "Petrea Prostul",
    bookmarkKey: "petrea-prostul_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "lantul-slabiciunilor": {
    path: "/src/data/opere/lantul-slabiciunilor.json",
    title: "Lantul slabiciunilor",
    bookmarkKey: "lantul-slabiciunilor_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "d-ale-carnavalului": {
    path: "/src/data/opere/d-ale-carnavalului.json",
    title: "Dale Carnavalului",
    bookmarkKey: "d-ale-carnavalului_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "conu-leonida": {
    path: "/src/data/opere/conu-leonida.json",
    title: "Conu Leonida",
    bookmarkKey: "conu-leonida_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "doua-loturi": {
    path: "/src/data/opere/doua-loturi.json",
    title: "Doua loturi",
    bookmarkKey: "doua-loturi_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "adam-si-eva": {
    path: "/src/data/opere/adam-si-eva.json",
    title: "Adam si Eva",
    bookmarkKey: "adam-si-eva_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "catastrofa": {
    path: "/src/data/opere/catastrofa.json",
    title: "Catastrofa",
    bookmarkKey: "catastrofa_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "cersetorul": {
    path: "/src/data/opere/cersetorul.json",
    title: "Cersetorul",
    bookmarkKey: "cersetorul_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "itic-strul-dezertor": {
    path: "/src/data/opere/itic-strul-dezertor.json",
    title: "Itic, strul, dezertor",
    bookmarkKey: "itic-strul-dezertor_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "cantecul-iubirii": {
    path: "/src/data/opere/cantecul-iubirii.json",
    title: "Cantecul iubirii",
    bookmarkKey: "cantecul-iubirii_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "ciuleandra": {
    path: "/src/data/opere/ciuleandra.json",
    title: "Ciuleandra",
    bookmarkKey: "ciuleandra_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "neamul-soimarestilor": {
    path: "/src/data/opere/neamul-soimarestilor.json",
    title: "Neamul Şoimăreştilor",
    bookmarkKey: "neamul-soimarestilor_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "creanga-de-aur": {
    path: "/src/data/opere/creanga-de-aur.json",
    title: "Creanga de aur",
    bookmarkKey: "creanga-de-aur_bookmark",
    maxWidth: "540px",
    width: "80vw"
  },
  "domnul-trandafir": {
    path: "/src/data/opere/domnul-trandafir.json",
    title: "Domnul Trandafir",
    bookmarkKey: "domnul-trandafir_bookmark",
    maxWidth: "550px",
    width: "80vw"
  },
  "dumbrava-minunata": {
    path: "/src/data/opere/dumbrava-minunata.json",
    title: "Dumbrava minunata",
    bookmarkKey: "dumbrava-minunata_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "fratii-jderi": {
    path: "/src/data/opere/fratii-jderi.json",
    title: "Fratii Jderi",
    bookmarkKey: "fratii-jderi_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "zodia-cancerului": {
    path: "/src/data/opere/zodia-cancerului.json",
    title: "Zodia Cancerului",
    bookmarkKey: "zodia-cancerului_bookmark",
    maxWidth: "530px",
    width: "80vw"
  },
  "act-venetian": {
    path: "/src/data/opere/act-venetian.json",
    title: "Act Venetian",
    bookmarkKey: "act-venetian_bookmark",
    maxWidth: "850px",
    width: "80vw"
  },
  "un-om-intre-oameni": {
    path: "/src/data/opere/un-om-intre-oameni.json",
    title: "Un om intre oameni",
    bookmarkKey: "un-om-intre-oameni_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "scrinul-negru": {
    path: "/src/data/opere/scrinul-negru.json",
    title: "Scrinul negru",
    bookmarkKey: "scrinul-negru_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "viata-lui-mihai-eminescu": {
    path: "/src/data/opere/viata-lui-mihai-eminescu.json",
    title: "Viata lui Mihai Eminescu",
    bookmarkKey: "viata-lui-mihai-eminescu_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "cartea-nuntii": {
    path: "/src/data/opere/cartea-nuntii.json",
    title: "Cartea nuntii",
    bookmarkKey: "cartea-nuntii_bookmark",
    maxWidth: "400px",
    width: "80vw"
  },
  "bietul-ioanide": {
    path: "/src/data/opere/bietul-ioanide.json",
    title: "Bietul Ioanide",
    bookmarkKey: "bietul-ioanide_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "ulysses": {
    path: "/src/data/opere/ulysses.json",
    title: "Ulysses",
    bookmarkKey: "ulysses_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "cel-mai-iubit-dintre-pamanteni": {
    path: "/src/data/opere/cel-mai-iubit-dintre-pamanteni.json",
    title: "Cel mai iubit dintre pamanteni",
    bookmarkKey: "cel-mai-iubit-dintre-pamanteni_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "intalnirea-din-pamanturi": {
    path: "/src/data/opere/intalnirea-din-pamanturi.json",
    title: "Intalnirea din pamanturi",
    bookmarkKey: "intalnirea-din-pamanturi_bookmark",
    maxWidth: "800px",
    width: "80vw"
  },
  "scrieri-de-tinerete": {
    path: "/src/data/opere/scrieri-de-tinerete.json",
    title: "Scrieri de tinerete",
    bookmarkKey: "scrieri-de-tinerete_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "jurnal-intim": {
    path: "/src/data/opere/jurnal-intim.json",
    title: "Jurnal intim",
    bookmarkKey: "jurnal-intim_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "asupra-poeziei-noastre-populare": {
    path: "/src/data/opere/asupra-poeziei-noastre-populare.json",
    title: "Asupra poeziei noastre populare",
    bookmarkKey: "asupra-poeziei-noastre-populare_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "directia-noua-in-poezia-si-proza-romana": {
    path: "/src/data/opere/directia-noua-in-poezia-si-proza-romana.json",
    title: "Directia noua in poezia si proza romana",
    bookmarkKey: "directia-noua-in-poezia-si-proza-romana_bookmark",
    maxWidth: "790px",
    width: "80vw"
  },
  "in-contra-directiei-de-asta-zi-in-cultura-romana": {
    path: "/src/data/opere/in-contra-directiei-de-asta-zi-in-cultura-romana.json",
    title: "In contra directiei de asta zi in cultura romana",
    bookmarkKey: "in-contra-directiei-de-asta-zi-in-cultura-romana_bookmark",
    maxWidth: "800px",
    width: "80vw"
  },
  "betia-de-cuvinte": {
    path: "/src/data/opere/betia-de-cuvinte.json",
    title: "Betia de cuvinte",
    bookmarkKey: "betia-de-cuvinte_bookmark",
    maxWidth: "670px",
    width: "80vw"
  },
  "unde-fugim-de-acasa": {
    path: "/src/data/opere/unde-fugim-de-acasa.json",
    title: "Unde fugim de acasa",
    bookmarkKey: "unde-fugim-de-acasa_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "la-lilieci": {
    path: "/src/data/opere/la-lilieci.json",
    title: "La lilieci",
    bookmarkKey: "la-lilieci_bookmark",
    maxWidth: "500px",
    width: "80vw"
  },
  "poezii": {
    path: "/src/data/opere/poezii.json",
    title: "Poezii",
    bookmarkKey: "poezii_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "paracliserul": {
    path: "/src/data/opere/paracliserul.json",
    title: "Paracliserul",
    bookmarkKey: "paracliserul_bookmark",
    maxWidth: "800px",
    width: "80vw"
  },
  "romanul-adolescentului-miop": {
    path: "/src/data/opere/romanul-adolescentului-miop.json",
    title: "Romanul adolescentului miop",
    bookmarkKey: "romanul-adolescentului-miop_bookmark",
    maxWidth: "700px",
    width: "80vw"
  },
  "nopti-la-serampore": {
    path: "/src/data/opere/nopti-la-serampore.json",
    title: "Nopti la serampore",
    bookmarkKey: "nopti-la-serampore_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "domnisoara-cristina": {
    path: "/src/data/opere/domnisoara-cristina.json",
    title: "Domnisoara Cristina",
    bookmarkKey: "domnisoara-cristina_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "sarpele": {
    path: "/src/data/opere/sarpele.json",
    title: "Sarpele",
    bookmarkKey: "sarpele_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "negru-pe-alb": {
    path: "/src/data/opere/negru-pe-alb.json",
    title: "Negru pe alb",
    bookmarkKey: "negru-pe-alb_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "o-alergare-de-cai": {
    path: "/src/data/opere/o-alergare-de-cai.json",
    title: "O alergare de cai",
    bookmarkKey: "o-alergare-de-cai_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "sobieski-si-romanii": {
    path: "/src/data/opere/sobieski-si-romanii.json",
    title: "Sobieski si romanii",
    bookmarkKey: "sobieski-si-romanii_bookmark",
    maxWidth: "700px",
    width: "80vw"
  },
  "istoria-civilizatiei-romane": {
    path: "/src/data/opere/istoria-civilizatiei-romane.json",
    title: "Istoria civilizatiei romane",
    bookmarkKey: "istoria-civilizatiei-romane_bookmark",
    maxWidth: "700px",
    width: "80vw"
  },
  "istoria-literaturii-romane-contemporane": {
    path: "/src/data/opere/istoria-literaturii-romane-contemporane.json",
    title: "Istoria literaturii romane contemporane",
    bookmarkKey: "istoria-literaturii-romane-contemporane_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "principii-de-estetica-de-george-calinescu": {
    path: "/src/data/opere/principii-de-estetica-de-george-calinescu.json",
    title: "Principii de estetica de George Calinescu",
    bookmarkKey: "principii-de-estetica-de-george-calinescu_bookmark",
    maxWidth: "750px",
    width: "80vw"
  },
  "titu-maiorescu-de-eugen-lovinescu": {
    path: "/src/data/opere/titu-maiorescu-de-eugen-lovinescu.json",
    title: "Titu Maiorescu de Eugen Lovinescu",
    bookmarkKey: "titu-maiorescu-de-eugen-lovinescu_bookmark",
    maxWidth: "750px",
    width: "80vw"
  },
  "mite": {
    path: "/src/data/opere/mite.json",
    title: "Mite",
    bookmarkKey: "mite_bookmark",
    maxWidth: "640px",
    width: "80vw"
  },
  "balauca": {
    path: "/src/data/opere/balauca.json",
    title: "Balauca",
    bookmarkKey: "balauca_bookmark",
    maxWidth: "640px",
    width: "80vw"
  }
};

export default function BookReader() {
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageInput, setPageInput] = useState("");
  const [showBookmarkConfirm, setShowBookmarkConfirm] = useState(false);
  const [bookmarkedPage, setBookmarkedPage] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getEffectiveMaxWidth = (bookConfig, pageIndex) => {
    if (!bookConfig) return undefined;
    const base = bookConfig.maxWidth;
    const rules = Array.isArray(bookConfig.widthRules) ? bookConfig.widthRules : [];
    if (!rules.length) return base;

    const matchesRule = (spec, idx) => {
      // Support comma-separated segments in a single spec
      const segments = String(spec).split(",").map(s => s.trim()).filter(Boolean);
      for (const seg of segments) {
        if (seg.includes("-")) {
          const [startStr, endStr] = seg.split("-");
          const start = startStr === "" ? 1 : parseInt(startStr, 10);
          const end = endStr === "" ? Infinity : parseInt(endStr, 10);
          if (Number.isFinite(start) && idx + 1 >= start && idx + 1 <= end) return true;
        } else {
          const single = parseInt(seg, 10);
          if (idx + 1 === single) return true;
        }
      }
      return false;
    };

    // Last matching rule wins (allows priority by order)
    let effective = base;
    for (const rule of rules) {
      if (rule && rule.spec && rule.maxWidth && matchesRule(rule.spec, pageIndex)) {
        effective = rule.maxWidth;
      }
    }
    return effective;
  };

  useEffect(() => {
    // Detect book from URL
    const pathParts = location.pathname.split('/');
    const bookSlug = pathParts[pathParts.length - 1];
    const bookConfig = BOOKS[bookSlug];

    if (!bookConfig) {
      console.error('Book not found:', bookSlug);
      setLoading(false);
      return;
    }

    setCurrentBook(bookConfig);

    // Resolve module by filename from config.path
    try {
      const fileName = String(bookConfig.path).split('/').pop();
      const moduleEntry = Object.entries(BOOK_MODULES).find(([key]) => key.endsWith(`/${fileName}`));

      if (!moduleEntry) {
        console.error('Book JSON module not found for', fileName);
        setLoading(false);
        return;
      }

      const module = moduleEntry[1];
      // Vite JSON modules export the parsed JSON as default
      const data = module.default ?? module;
      if (!Array.isArray(data)) {
        console.error('Invalid JSON format for book', fileName);
        setLoading(false);
        return;
      }

      setPages(data);
      // Load bookmark first (has priority)
      const bookmark = Number(localStorage.getItem(bookConfig.bookmarkKey));
      // Load last page position (separate from bookmark)
      const lastPageKey = bookConfig.bookmarkKey + "_lastpage";
      const lastPage = Number(localStorage.getItem(lastPageKey));
      
      // If bookmark exists and is valid, use it
      if (!isNaN(bookmark) && bookmark >= 0 && bookmark < data.length) {
        setPage(bookmark);
        setBookmarkedPage(bookmark);
      } 
      // Otherwise, use last page if valid
      else if (!isNaN(lastPage) && lastPage >= 0 && lastPage < data.length) {
        setPage(lastPage);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading book module:', error);
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!loading && currentBook) {
      // Save current page to separate key (not overwriting bookmark)
      const lastPageKey = currentBook.bookmarkKey + "_lastpage";
      localStorage.setItem(lastPageKey, page);
    }
  }, [page, loading, currentBook]);

  const goBack = () => {
    // Save current page before exiting (but preserve bookmark)
    if (currentBook) {
      const lastPageKey = currentBook.bookmarkKey + "_lastpage";
      localStorage.setItem(lastPageKey, page);
    }
    
    if (location.state && location.state.from) {
      const { pathname, scrollY } = location.state.from;
      navigate(pathname || -1, { state: { restoreScroll: typeof scrollY === 'number' ? scrollY : 0 } });
    } else {
      navigate(-1);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageInput) - 1; // Convert to 0-based index
    if (pageNumber >= 0 && pageNumber < pages.length) {
      setPage(pageNumber);
      setPageInput("");
      // Scroll to top on page change
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  const handleBookmarkClick = () => {
    setShowBookmarkConfirm(true);
  };

  const confirmBookmark = () => {
    if (currentBook) {
      localStorage.setItem(currentBook.bookmarkKey, page);
      setBookmarkedPage(page);
    }
    setShowBookmarkConfirm(false);
  };

  const cancelBookmark = () => {
    setShowBookmarkConfirm(false);
  };

  const removeBookmark = () => {
    if (currentBook) {
      localStorage.removeItem(currentBook.bookmarkKey);
      setBookmarkedPage(null);
    }
    setShowBookmarkConfirm(false);
  };

  if (loading) return <div>Se încarcă cartea...</div>;
  if (!pages.length || !currentBook) return <div>Cartea nu a putut fi încărcată.</div>;

  return (
    <div className="book-reader-wrapper">
      {bookmarkedPage !== null && (
        <div className="book-reader-bookmark-indicator">
          <div className="bookmark-icon">🔖</div>
          <span className="bookmark-text">Pagina {bookmarkedPage + 1}</span>
        </div>
      )}
      <div className="book-reader-header">
        {isMobile ? (
          <>
            <h1 className="book-reader-title">{currentBook.title}</h1>
            <div className="book-reader-header-buttons">
              <button className="book-reader-back" onClick={goBack}>Înapoi</button>
              <button 
                className="book-reader-bookmark-btn" 
                onClick={handleBookmarkClick}
              >
                {bookmarkedPage === page ? "Pagina fixată" : "Salvează pagina curentă"}
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="book-reader-back" onClick={goBack}>Înapoi</button>
            <button 
              className="book-reader-bookmark-btn" 
              onClick={handleBookmarkClick}
            >
              {bookmarkedPage === page ? "Pagina fixată" : "Salvează pagina curentă"}
            </button>
            <span className="book-reader-title">{currentBook.title}</span>
          </>
        )}
      </div>
      <div 
        className="book-reader"
        style={{
          maxWidth: getEffectiveMaxWidth(currentBook, page),
          width: currentBook.width
        }}
      >
        <div className="book-reader-content">
          <div className="book-reader-page">{pages[page]}</div>
        </div>
      </div>

      {/* Floating pagination controls (bottom-left) */}
      <div className="book-reader-floating-controls">
        <button
          className="br-float-btn"
          onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }}
          disabled={page === 0}
          aria-label="Pagina anterioară"
        >
          ◀
        </button>
        <form onSubmit={handlePageInputSubmit} className="br-float-form">
          <div className="br-float-input-wrap">
            <input
              type="number"
              min="1"
              max={pages.length}
              value={pageInput}
              onChange={handlePageInputChange}
              placeholder={`${page + 1}`}
              className="br-float-input"
              aria-label="Număr pagină"
            />
            <div className="br-float-steppers" aria-hidden="false" role="group" aria-label="Schimbare pagină rapidă">
              <button
                type="button"
                className="br-step br-step-up"
                onClick={() => { setPage(p => Math.min(pages.length - 1, p + 1)); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }}
                disabled={page === pages.length - 1}
                aria-label="Pagina următoare"
              />
              <button
                type="button"
                className="br-step br-step-down"
                onClick={() => { setPage(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }}
                disabled={page === 0}
                aria-label="Pagina anterioară"
              />
            </div>
          </div>
          <span className="br-float-total">/ {pages.length}</span>
        </form>
        <button
          className="br-float-btn"
          onClick={() => { setPage(p => Math.min(pages.length - 1, p + 1)); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }}
          disabled={page === pages.length - 1}
          aria-label="Pagina următoare"
        >
          ▶
        </button>
      </div>
      
      {showBookmarkConfirm && (
        <div className="book-reader-confirm-overlay" onClick={cancelBookmark}>
          <div className="book-reader-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Fixare pagină</h3>
            <p>Vrei să fixezi pagina {page + 1} ca pagina curentă?</p>
            <div className="book-reader-confirm-buttons">
              <button onClick={confirmBookmark} className="book-reader-confirm-btn">
                Da, fixează
              </button>
              {bookmarkedPage !== null && (
                <button onClick={removeBookmark} className="book-reader-remove-btn">
                  Anulează fixarea
                </button>
              )}
              <button onClick={cancelBookmark} className="book-reader-cancel-btn">
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
}
