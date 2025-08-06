const token = JSON.parse(localStorage.getItem('userSession'))?.token || '';

export const accessToken = `Bearer ${token}`;
export const staticToken = `Bearer aKSiOAujZpWrfIbHVrkrUxDcIBHddnkz`;
export const staticTokenUsman = `Bearer A9NqVmuKAYL3BDbbLwt45SS12gHWOZBMxLK8nwCeZm25x96xnf`;
