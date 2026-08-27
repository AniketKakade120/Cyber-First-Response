import { MobileBottomNav } from './mobile-bottom-nav';
import { ServiceFooter } from './service-footer';
import { ServiceHeader } from './service-header';

export function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <div className="site-shell"><ServiceHeader /><main id="main-content" tabIndex={-1}>{children}</main><ServiceFooter /><MobileBottomNav /></div>;
}
