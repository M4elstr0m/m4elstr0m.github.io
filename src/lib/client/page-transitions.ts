import { isHomePath, stripLocalePrefix } from '../locale-path';

function depth(pathname: string) {
  return pathname.split('/').filter(Boolean).length;
}

export function initPageTransitions() {
  let pendingContactTransition: string | null = null;
  let pendingMultiHop = false;

  document.addEventListener('astro:before-preparation', (event) => {
    const fromDepth = depth(event.from.pathname);
    const toDepth = depth(event.to.pathname);
    if (toDepth < fromDepth) {
      event.direction = 'back';
    } else if (toDepth > fromDepth) {
      event.direction = 'forward';
    }

    if (isHomePath(event.to.pathname) && !isHomePath(event.from.pathname)) {
      const fromPath = stripLocalePrefix(event.from.pathname);
      const section =
        event.to.hash === '#contact'
          ? 'contact'
          : fromPath.startsWith('/about')
            ? 'about'
            : fromPath.startsWith('/projects')
              ? 'projects'
              : null;
      if (section) sessionStorage.setItem('landing-section', section);
    }

    const enteringContact = isHomePath(event.to.pathname) && event.to.hash === '#contact';
    const leavingContact = document.documentElement.dataset.leavingContact === 'true';
    delete document.documentElement.dataset.leavingContact;

    pendingContactTransition = enteringContact ? 'up' : leavingContact ? 'down' : null;
    pendingMultiHop = document.documentElement.dataset.multiHop === 'true';
    delete document.documentElement.dataset.multiHop;

    if (pendingContactTransition) {
      document.documentElement.dataset.contactTransition = pendingContactTransition;
    } else {
      delete document.documentElement.dataset.contactTransition;
    }
  });

  document.addEventListener('astro:before-swap', (event) => {
    if (pendingContactTransition) {
      event.newDocument.documentElement.dataset.contactTransition = pendingContactTransition;
    }
    if (pendingMultiHop) {
      event.newDocument.documentElement.dataset.multiHop = 'true';
    }
  });

  document.addEventListener('astro:after-swap', () => {
    if (!isHomePath(location.pathname)) return;
    const section = sessionStorage.getItem('landing-section');
    if (!section) return;
    sessionStorage.removeItem('landing-section');
    document.getElementById(section)?.scrollIntoView({ behavior: 'instant' });
  });

  document.addEventListener('astro:page-load', () => {
    delete document.documentElement.dataset.contactTransition;
    delete document.documentElement.dataset.multiHop;
  });
}
