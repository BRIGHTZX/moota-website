import PageLoader from '@/components/PageLoader';
import { Suspense } from 'react';
import TakeAwayHistoryClient from './client';

function TakeAwayHistoryPage() {
    return (
        <Suspense fallback={<PageLoader />}>
            <TakeAwayHistoryClient />
        </Suspense>
    );
}

export default TakeAwayHistoryPage;
