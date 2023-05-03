import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { Button, Blue, Flex, Input, Table, InputProps, Para, Container } from './../component/Shrtx.style';

const Shrt: React.FC<InputProps> = () => {
  const [shortUrls, setShortUrls] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
      setShortUrls(prevState => [...prevState, res.data.result.full_short_link]);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleClick = () => {
    setInputValue(value);
    setValue('');
  };
  
  const handleDelete = (index: number) => {
    const updatedUrls = [...shortUrls];
    updatedUrls.splice(index, 1);
    setShortUrls(updatedUrls);
  }

  return (
    <Container>
    <h1>Easy URL Shortner</h1>
      <Blue>
        <h3>Simplify your url</h3>
      <Flex>
        <Input placeholder="place a link to shorten" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleClick}>Shorten</Button>
      </Flex>
      <p>All the shorted URL and their analysis aee public</p>
      </Blue>
      <Container>
      <h3>RECENT URLS</h3>
      <Table>
        <tr>
          <th>Original URL</th>
          <th>Shortened URL URL</th>
        </tr>
      {loading ? (
        <p>loading</p>
      ) : (
        shortUrls.map((shortUrl, index) => (
          <tr key={index} style={{gap: '70px'}}>
            <Para style={{width: '15%'}}>{inputValue}</Para>
            <Para>{shortUrl}</Para>
            <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
              <Para>{copied ? 'Copied!' : 'Copy'}</Para>
            </CopyToClipboard>
            <Para onClick={() => handleDelete(index)}>Delete</Para>
          </tr>
        ))
      )}
      </Table>
      </Container>
      {error && <p>Something went wrong</p>}
      </Container>
  );
};

export default Shrt;
