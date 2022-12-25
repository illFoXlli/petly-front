import {
  Checkbox,
  Content,
  Data,
  Footer,
  Label,
  Link,
  P,
  Span,
  SpanDots,
  Strip,
  Title,
  Wrapper,
  WrapperContent,
} from './CardNew.styled';
import { v4 as uuidv4 } from 'uuid';

export const CardNew = ({ news }) => {
  const { title, url, description, date } = news;

  const id = uuidv4();

  const newDescriptionStart = description.slice(0, 195);
  const newDescriptionEnd = description.slice(195);

  const more = () => {
    return <a href="#">more</a>;
  };

  return (
    <>
      <Wrapper>
        <WrapperContent>
          <div>
          <Strip />
          <Title>{title || 'no title'}</Title>
          </div>
          <Content>
            <P><Checkbox type="checkbox" id={id} />
            {newDescriptionStart || 'no description'}
            <SpanDots> ...</SpanDots>
            <Span>{newDescriptionEnd}</Span>
            <Label for={id} /></P>
          </Content>
        </WrapperContent>
        <Footer>
          <Data>{date || ''}</Data>
          <Link href={url} target="_blank">
            Read more
          </Link>
        </Footer>
      </Wrapper>
    </>
  );
};
