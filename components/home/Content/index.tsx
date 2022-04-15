import { FC } from "react";

import Table from "components/common/Table";
import Loading from "components/common/Loading";
import Modal from "components/common/Modal";

import { useIntersectionObserver, useModalData } from "components/common/hooks";
import useContent from "./hook";

import { TITLE, AUTHOR } from "assets/string";
import { postColumn } from "assets/columns";

const Content: FC = () => {
  const { isModalVisible, showModal, closeModal } = useModalData();
  const {
    setPage,
    // getSelectedPost,
    posts,
    selectedPost,
    isNeedMoreFetch,
    postsLoading,
    addPostLoading,
    selectedPostLoading,
  } = useContent();

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !addPostLoading && !postsLoading) {
        setPage();
      }
    },
  });

  return (
    <>
      <Table
        data={posts}
        columns={postColumn}
        onClick={(event) => {
          if (
            typeof event.currentTarget.rowIndex === "number" &&
            event.currentTarget.rowIndex > 0
          ) {
            // getSelectedPost(event.currentTarget.rowIndex);
            showModal();
          }
        }}
      />
      {isNeedMoreFetch ? (
        <div ref={setTarget}>
          <Loading height="100px" />
        </div>
      ) : (
        <div className="flex justify-center m-8 font-medium">페이지 끝!</div>
      )}

      <Modal visible={isModalVisible} closeModal={closeModal}>
        {selectedPostLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2 mx-4 mt-8 mb-0">
            <div className="text-xl font-bold">{`${TITLE} ${selectedPost?.title}`}</div>
            <div className="flex justify-end font-medium">{`${AUTHOR} ${selectedPost?.author}`}</div>
            <div className="my-4 mx-0">{`${selectedPost?.content}`}</div>
            <div className="flex justify-center text-slate-200">{`${selectedPost?.createdAt}`}</div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Content;
