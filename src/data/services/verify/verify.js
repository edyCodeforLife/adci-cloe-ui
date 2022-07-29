import {
  EP_CHECK_WATCHLIST,
  EP_CHECK_FDC,
  EP_CHECK_PEFINDO
} from '@utility/Endpoints';
import { DataService } from '../config';

export class VerifyServiceData {
  PostSaveCheckWatchlist(req) {
    return DataService.post(EP_CHECK_WATCHLIST, req);
  }

  PostSaveCheckFDC(req) {
    return DataService.post(EP_CHECK_FDC, req);
  }

  PostSaveCheckPefindo(req) {
    return DataService.post(EP_CHECK_PEFINDO, req);
  }
}