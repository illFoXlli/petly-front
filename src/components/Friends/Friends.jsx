import { Box, Container, Div, Img, Title, Item, List } from './Friends.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOurFriends } from 'redux/ourFriend/ourFriendOperations';
import { selectOurFriends } from 'redux/ourFriend/ourFriendSelectors';

const Friends = () => {
  const dispatch = useDispatch();
  const dataFriends = useSelector(selectOurFriends);
  console.log(dataFriends);
  useEffect(() => {
    dispatch(getOurFriends);
  }, [dispatch]);

  return (
    <Container>
      {dataFriends.map(
        ({
          _id,
          title,
          address,
          addressUrl,
          email,
          imageUrl,
          phone,
          url,
          workDays,
        }) => (
          <Box key={_id}>
            <Title>{title}</Title>
            <Div>
              <Img src={imageUrl}></Img>
              <List key={_id}>
                <Item>{email}</Item>
                <Item>{address}</Item>
                <Item>{addressUrl}</Item>
                <Item>{imageUrl}</Item>
                <Item>{phone}</Item>
                <Item>{url}</Item>
                <Item>{workDays}</Item>
              </List>
            </Div>
          </Box>
        )
      )}
    </Container>
  );
};

export default Friends;
