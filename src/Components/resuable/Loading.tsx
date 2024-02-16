import React from 'react';
import { Flex, Spin } from 'antd';

const Loading: React.FC = () => (
  <Flex align='center' gap='middle'>
    <Spin size='large' fullscreen />
  </Flex>
);

export default Loading;
