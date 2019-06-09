import {StartPage} from "../pages/start/start";
import {PushMessagePage} from "../pages/push-message/push-message";
import {VereinViewPage} from "../pages/verein-view/verein-view";
import {SpielViewPage} from "../pages/spiel-view/spiel-view";
import {HasFotoPage} from "../pages/has-foto/has-foto";
import {VerpflegungPage} from "../pages/verpflegung/verpflegung";
import {RahmenprogrammSportartikelPage} from "../pages/rahmenprogramm-sportartikel/rahmenprogramm-sportartikel";
import {LageplanPage} from "../pages/lageplan/lageplan";
import {ModusPage} from "../pages/modus/modus";
import {LinksPage} from "../pages/links/links";
import {LoginPage} from "../pages/login/login";
import {AboutPage} from "../pages/about/about";

export const appMenuPages = [
  {title: 'Start', component: StartPage},
  {title: 'News', component: PushMessagePage},
  {title: 'Mannschaftsspielpläne', component: VereinViewPage},
  {title: 'Tabellen & Spielpläne', component: SpielViewPage},
  {title: 'Mannschaftsfoto', component: HasFotoPage},
  {title: 'Verpflegung', component: VerpflegungPage},
  {title: 'Rahmenprogramm', component: RahmenprogrammSportartikelPage},
  {title: 'Lageplan', component: LageplanPage},
  {title: 'Modus', component: ModusPage},
  {title: 'Links', component: LinksPage},
  {title: 'Login', component: LoginPage},
  {title: 'Über', component: AboutPage}
];
