import axios from 'axios';
import userscriptAdapter from 'axios-userscript-adapter';

export function setupAxios() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axios.defaults.adapter = userscriptAdapter as any;
}
