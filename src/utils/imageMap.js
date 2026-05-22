/**
 * Mapping filename → import webpack.
 *
 * Pour ajouter un nouveau projet :
 *  1. Déposer l'image dans src/img/
 *  2. Ajouter l'import ici
 *  3. Ajouter l'entrée dans la map
 *  4. Référencer le filename dans src/data/projects.json
 */

import anansiImg      from "../img/anansi_banner.jpg";
import ekeaImg        from "../img/ekea_banner.jpg";
import justyappingImg from "../img/justyapping_banner.jpg";
import stattrakImg    from "../img/stattrak-banner.jpg";
import rogerImg       from "../img/r0ger_banner.jpg";
import pixelwarImg    from "../img/pixelwar.PNG";
import judgeImg       from "../img/judge.png";
import bastionImg     from "../img/projet-bastion.PNG";
import coiffeurImg    from "../img/projet-coiffeur.jpeg";
import clapinImg      from "../img/projet-clapin.PNG";
import rachImg        from "../img/projet-rach.jfif";
import crecheImg      from "../img/projet-creche.jpg";
import streamBattleImg from "../img/projet-streamBattle.png";
import nycevImg       from "../img/projet-nycev.PNG";
import ppImg          from "../img/pp.jpg";
import cvImg          from "../img/cv.PNG";

export const imageMap = {
  "anansi_banner.jpg":       anansiImg,
  "ekea_banner.jpg":         ekeaImg,
  "justyapping_banner.jpg":  justyappingImg,
  "stattrak-banner.jpg":     stattrakImg,
  "r0ger_banner.jpg":        rogerImg,
  "pixelwar.PNG":            pixelwarImg,
  "judge.png":               judgeImg,
  "projet-bastion.PNG":      bastionImg,
  "projet-coiffeur.jpeg":    coiffeurImg,
  "projet-clapin.PNG":       clapinImg,
  "projet-rach.jfif":        rachImg,
  "projet-creche.jpg":       crecheImg,
  "projet-streamBattle.png": streamBattleImg,
  "projet-nycev.PNG":        nycevImg,
  "pp.jpg":                  ppImg,
  "cv.PNG":                  cvImg,
};
