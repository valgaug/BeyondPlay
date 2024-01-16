import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_LOGS } from '../../graphql/queries/logs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Log {
  operation: string;
  user: string;
  timestamp: string;
}

const LogRetrievals: React.FC = () => {
  const [getAccessLogs, { loading, data, error }] = useLazyQuery(GET_LOGS, {
    fetchPolicy: 'network-only',
  });

  const handleClick = () => {
    getAccessLogs();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: 1, borderColor: 'divider', p: 3, borderRadius: 2 }}>
      <Button variant='contained' onClick={handleClick}>
        Get Access Logs
      </Button>
      {error && <Typography color='error'>Error: {error.message}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {!error && data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, alignItems: 'center' }}>
          {data.getAccessLogs.map((log: Log) => (
            <Box key={log.timestamp}>
              <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>
                Operation: {log.operation}, User: {log.user}, Timestamp: {new Date(log.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LogRetrievals;
