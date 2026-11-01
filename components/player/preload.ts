const MAX_WARM_SOURCES = 3;

const warm = new Map<string, HTMLAudioElement>();

type NetworkInformation = { saveData?: boolean };

function prefersSavingData() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return connection?.saveData === true;
}

function release(element: HTMLAudioElement) {
  element.removeAttribute("src");
  element.load();
}

export function preloadSource(url: string | null, { optional = false } = {}) {
  if (!url || typeof window === "undefined") return;
  if (optional && prefersSavingData()) return;

  const existing = warm.get(url);
  if (existing) {
    warm.delete(url);
    warm.set(url, existing);
    return;
  }

  const element = new Audio();
  element.preload = "metadata";
  element.muted = true;
  element.src = url;
  warm.set(url, element);

  for (const [oldUrl, oldElement] of warm) {
    if (warm.size <= MAX_WARM_SOURCES) break;
    release(oldElement);
    warm.delete(oldUrl);
  }
}
