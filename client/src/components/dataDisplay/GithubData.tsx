import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries/github';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Repo {
  name: string;
  url: string;
  description: string;
}

const RepositoriesComponent: React.FC = () => {
  const [githubUserName, setGithubUserName] = useState('');
  const [shouldFetch, setShouldFetch] = useState('');

  const { error, data } = useQuery(GET_REPOSITORIES, {
    variables: { githubUserName: shouldFetch },
    skip: !shouldFetch,
  });

  const handleClick = () => {
    setShouldFetch(githubUserName);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: 1, borderColor: 'divider', p: 3, borderRadius: 2 }}>
      <TextField label='GitHub Username' variant='outlined' value={githubUserName} onChange={(e) => setGithubUserName(e.target.value)} />
      <Button variant='contained' onClick={handleClick}>
        Get Repositories
      </Button>
      {error && <Typography color='error'>Error: {error.message}</Typography>}
      {data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>Repositories for {data.getRepositories.userName}:</Typography>
          {data.getRepositories.map((repo: Repo) => (
            <Box key={repo.name}>
              <Typography sx={{ fontSize: '1rem', fontFamily: 'Arial' }}>
                <a href={repo.url}>{repo.name}</a> - {repo.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RepositoriesComponent;
