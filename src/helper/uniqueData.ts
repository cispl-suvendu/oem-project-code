export function filterData(data) {
    const uniqueCategories = new Set();
    return data.reduce((acc, cur) => {
      if (!uniqueCategories.has(cur)) {
        uniqueCategories.add(cur);
        acc.push({ test: cur, tag: 'upcoming', url:'' });
      }
      return acc;
    }, []);
  }