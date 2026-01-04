import { get } from 'aws-amplify/api';
import { mockSchedules, type ScheduleItem } from '../data/mockSchedule';

const API_NAME = 'rinaPortfolioApi';
const PATH = '/schedules';

/**
 * スケジュール一覧を取得する
 * 環境変数 VITE_USE_MOCK_DATA が 'true' の場合はモックデータを返す
 */
export const fetchSchedules = async (): Promise<ScheduleItem[]> => {
    // 環境変数の読み込み (文字列として比較)
    const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

    if (useMock) {
        console.log('Using Mock Data for Schedules');
        // ネットワーク遅延をシミュレート
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockSchedules;
    }

    console.log('Fetching Schedules from API...');
    try {
        const restOperation = get({
            apiName: API_NAME,
            path: PATH
        });
        const { body } = await restOperation.response;
        const json = await body.json();
        console.log('API Response:', json);
        return json as unknown as ScheduleItem[];
    } catch (error) {
        console.error('Error fetching schedules from API:', error);
        throw error;
    }
};
