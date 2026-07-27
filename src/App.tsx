import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Onboard from './pages/Onboard';
import ThankYou from './pages/ThankYou';
import SiteView from './pages/SiteView';
import MasterLogin from './pages/MasterLogin';
import MasterDashboard from './pages/MasterDashboard';
import MasterEditView from './pages/MasterEditView';

const KNOWN_HOSTS = ['launchsite.app', 'launchsite.pro', 'localhost'];

function isKnownHost(hostname: string): boolean {
  if (KNOWN_HOSTS.includes(hostname)) return true;
  if (hostname.endsWith('.vercel.app')) return true;
  return false;
}

export default function App() {
  const hostname = window.location.hostname;

  if (!isKnownHost(hostname)) {
    // TODO(Phase 5): look up the site by custom_domain and render
    // <SiteView siteIdOverride={id} /> directly, bypassing the router
    // entirely, per the spec's custom-domain routing rule.
    return <SiteView />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/onboard" element={<Onboard />} />
      <Route path="/thank-you/:siteId" element={<ThankYou />} />
      <Route path="/site/:siteId" element={<SiteView />} />
      <Route path="/master-editor" element={<MasterLogin />} />
      <Route path="/master-editor/dashboard" element={<MasterDashboard />} />
      <Route path="/master-editor/edit/:siteId" element={<MasterEditView />} />
    </Routes>
  );
}
