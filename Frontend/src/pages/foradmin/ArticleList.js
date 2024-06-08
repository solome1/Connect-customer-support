import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const ArticleList = ({ articles }) => {
  return (
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {article.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {article.summary}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;