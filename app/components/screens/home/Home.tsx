import Layout from '@/components/ui/layout/Layout';
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import Timer from './timer/Timer';

const Home: FC = () => {
    return (
       <Layout title='Timer'>
        <Timer/>
       </Layout>
    );
};

export default Home;