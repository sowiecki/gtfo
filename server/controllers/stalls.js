/* globals setInterval, clearInterval */
import store from '../store';
import { config } from '../environment';
import { FETCH_STALL_OCCUPANCIES } from '../ducks/stalls';
import { CHECK_INTERVAL } from '../constants';

const stallsController = {
  initialize() {
    if (!config.public.enableStalls) {
      return;
    }

    // Set interval for checking and responding to stall states
    const monitorExternalServices = setInterval(() => {
      store.dispatch({ type: FETCH_STALL_OCCUPANCIES });

      if (process.env.MOCKS) {
        // No need to continually check mock data for updates
        clearInterval(monitorExternalServices);
      }
    }, CHECK_INTERVAL);
  }
};

export default stallsController;
