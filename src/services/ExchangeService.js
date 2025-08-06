import axios from 'axios';

export async function getExchangeRateIDR() {
  return await axios({
    url: `https://open.er-api.com/v6/latest/IDR`,
    method: 'get',
  });
}

export async function getExchangeRate(currency) {
  return await axios({
    url: `https://open.er-api.com/v6/latest/${currency}`,
    method: 'get',
  });
}
