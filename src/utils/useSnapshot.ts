import { useState, useEffect, useRef } from 'react';
import { INote } from './interfaces';

const useMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    return isMounted;
};

const useSnapshot = (query: any) => {
    const [data, updateData] = useState<INote[]>(new Array<INote>());
    const [loading, setLoading] = useState(true);
    const mounted = useMounted();

    useEffect(() => {
        const snapshot = query.onSnapshot((snapshot: any) => {
            // create data array to feed to state
            let data: INote[] = [];
            snapshot.forEach((doc: any) => {
                data.push(doc);
            });
            // set states
            if (mounted.current) updateData(data);
            if (setLoading && mounted.current) setLoading(false);
        });
        return () => snapshot();
    }, []);

    return { data, loading };
};

export default useSnapshot;
