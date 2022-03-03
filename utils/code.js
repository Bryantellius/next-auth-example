const langs = {
  javascript: { ext: ".js", abbr: "js" },
  typescript: { ext: ".ts", abbr: "ts" },
  csharp: { ext: ".cs", abbr: "cs" },
  java: { ext: ".java", abbr: "java" },
  python: { ext: ".py", abbr: "py" },
};

export function getLangExt(language) {
  return langs[language].ext;
}

export function getLang(ext) {
  for (let lang in langs) {
    if (langs[lang].ext == ext) {
      return lang;
    }
  }

  return false;
}

export function getAbbr(language) {
  return langs[language].abbr;
}

export function parsePid(param) {
  let res = param.split("-");
  res[0] = getLang("." + res[0]);
  return res;
}
