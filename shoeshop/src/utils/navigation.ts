export function navigateTo(path :Ipath, params?: Iparams) {
    window.location.assign(
      `http://${window.location.host}/${path}/index.html${params ?? ""}`
    );
  }
  