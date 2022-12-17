import ModalNotice from 'components/ModalNotice/ModalNotice';
import NoticeCategoryItem from 'components/NoticeCategoryItem/NoticeCategoryItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from 'redux/notice/noticeOperations';
import { selectNotices } from 'redux/notice/noticeSelectors';
import { List, Wrapper } from './NoticeCategoryList.styled';

const NoticeCategoryList = () => {
  const notices = useSelector(selectNotices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotices());
  }, [dispatch]);

  const isModalOpen = useSelector(state => state.notice.isLearnMoreModalOpen);

  return (
    <Wrapper>
      <List>
        {notices?.map(
          ({
            birthday,
            breed,
            category,
            comments,
            location,
            name,
            owner,
            photoURL,
            price,
            sex,
            title,
            _id,
          }) => (
            <NoticeCategoryItem
              key={_id}
              id={_id}
              image={photoURL}
              title={title}
              comments={comments}
              name={name}
              breed={breed}
              category={category}
              location={location}
              birthday={birthday}
              price={price}
              sex={sex}
            />
          )
        )}
      </List>
      {isModalOpen && <ModalNotice />}
    </Wrapper>
  );
};

export default NoticeCategoryList;
