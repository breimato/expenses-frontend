declare const __APP_BUILD_ID__: string;

const BUILD_ID_STORAGE_KEY = 'expenses-app-build-id';

export function ensureFreshBuild(): void {
  const buildId = typeof __APP_BUILD_ID__ === 'string' ? __APP_BUILD_ID__ : '';
  if (!buildId) {
    return;
  }

  const storedBuildId = localStorage.getItem(BUILD_ID_STORAGE_KEY);
  if (storedBuildId && storedBuildId !== buildId) {
    localStorage.setItem(BUILD_ID_STORAGE_KEY, buildId);
    window.location.reload();
    return;
  }

  localStorage.setItem(BUILD_ID_STORAGE_KEY, buildId);
}
