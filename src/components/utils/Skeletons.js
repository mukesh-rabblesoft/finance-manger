import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Skeletons = (props) => {

  const [settings, setSettings] = useState(null)

  useEffect(() => {
    setSettings(props.skeletons);
  })

  return (
    <Stack spacing={1} className={`m-3`}>
      {settings && settings.length >0?
        (settings.map((setting, index) => (
          <Skeleton key={`skeleton-${index}`} animation="wave" variant={setting.variant} width={setting.width} height={setting.height} />
        )))
        :<></>
      }
      
    </Stack>
  );
}

export default Skeletons