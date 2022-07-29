import {
    EP_CM_REPORT_GET_DASHBOARD
} from '@utility/Endpoints';
import { EP_BD_GET_DASHBOARD, EP_COMMITTEE_GET_DASHBOARD } from '../../../utility/Endpoints';
import { DataService } from '../config';

export class MerchantDashboardData {
    GetCMDashboardData(userId) {
        return DataService.get(`${EP_CM_REPORT_GET_DASHBOARD}?userLogin=${userId}`)
    }

    GetCommitteeDashboardData(userId) {
        return DataService.get(`${EP_COMMITTEE_GET_DASHBOARD}?userLogin=${userId}`)
    }

    GetBDDashboardData(userId) {
        return DataService.get(`${EP_BD_GET_DASHBOARD}?userLogin=${userId}`)
    }
}