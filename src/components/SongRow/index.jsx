import React from 'react';
import * as S from './styles';
import { FiDownload } from 'react-icons/fi';

export function SongRow({ number, title, difficulty, onDownload }) {
  return (
    <S.Row onClick={onDownload}>
      <S.Number>{number}</S.Number>
      
      <S.Title>{title}</S.Title>
      
      <S.Difficulty $level={difficulty}>
        {difficulty}
      </S.Difficulty>
      
      <S.DownloadButton onClick={(e) => {
        e.stopPropagation();
        onDownload();
      }}>
        <FiDownload size={20} />
      </S.DownloadButton>
    </S.Row>
  );
}