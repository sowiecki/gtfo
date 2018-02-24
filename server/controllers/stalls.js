/* globals setInterval, clearInterval */
import store from '../store';
import { config } from '../../environment';
import { FETCH_STALL_OCCUPANCIES } from '../ducks/stalls';
import { STALLS_CHECK_INTERVAL } from '../constants';

const stallsController = {
  initialize() {
    if (!config.public.enableStalls) {
      return;
    }

    const fetchStallOccupancies = () => store.dispatch({ type: FETCH_STALL_OCCUPANCIES });
    fetchStallOccupancies();

    // Set interval for checking and responding to stall states
    const monitorExternalServices = setInterval(() => {
      fetchStallOccupancies();

      if (process.env.MOCKS) {
        // No need to continually check mock data for updates
        clearInterval(monitorExternalServices);
      }
    }, STALLS_CHECK_INTERVAL);
  }
};

export default stallsController;
