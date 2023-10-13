import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArticle } from '../../../services/blogService';
import { setLocation, setStatus } from '../../../store/slices/status-slice';
import SingleArticle from '../SingleArticle/SingleArticle';

import styles from './ArticleForm.module.scss';

function ArticleForm() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { token } = useSelector((state) => state.user.user);

  const { articles } = useSelector((state) => state.articles);
  const article = articles.find((item) => item.slug === slug);

  useEffect(() => {
    console.log(slug);
    console.log(token);
    dispatch(setLocation('article-page'));
    dispatch(setStatus('loading'));
    dispatch(fetchArticle(slug, token));
  }, [dispatch, slug]);

  const articleExist = article && Object.keys(article).length !== 0;

  return <div className={styles.main}>{articleExist && <SingleArticle article={article} />}</div>;
}

export default ArticleForm;
