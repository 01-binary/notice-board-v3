/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useCallback } from "react";

import Button from "components/common/Button";
import Modal from "components/common/Modal";
import Loading from "components/common/Loading";

import { useModalData } from "components/common/hooks";
import useTool from "./hook";

import { ADD_POST, TITLE, CONTENT, AUTHOR, TOTAL } from "assets/string";
import type { AddPostRequest, AddPostInput } from "interface/posts";

const Tool: FC = () => {
  const { isModalVisible, showModal, closeModal } = useModalData();
  const {
    // addPost,
    addPostLoading,
    total,
  } = useTool();
  const [formState, SetFormState] = useState<AddPostRequest>({
    title: "",
    author: "",
    content: "",
  });

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      // addPost({ addPostRequest: { ...formState }, onSuccess: closeModal });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formState],
  );

  const handleChange = (input: AddPostInput) => (event: any) => {
    switch (input) {
      case "title":
        SetFormState({ ...formState, title: event.target.value });
        break;
      case "author":
        SetFormState({ ...formState, author: event.target.value });
        break;
      case "content":
        SetFormState({ ...formState, content: event.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="text-lg font-medium">{`${TOTAL} ${total}개`}</div>
        <Button
          size={"medium"}
          onClick={() => {
            showModal();
          }}
        >
          {ADD_POST}
        </Button>
      </div>
      <Modal visible={isModalVisible} closeModal={closeModal}>
        {addPostLoading ? (
          <Loading />
        ) : (
          <>
            <form
              className="flex flex-col gap-8 m-4 font-medium"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center">
                <label className="inline-block w-[20%]">{TITLE}</label>
                <input
                  className="w-[70%] border-0 border-b border-[lightgrey] focus:border-[blueviolet] border-solid focus:outline-0"
                  type="text"
                  value={formState.title}
                  onChange={handleChange("title")}
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="inline-block w-[20%]">{CONTENT}</label>
                <textarea
                  className="w-[70%] border-0 border-b border-[lightgrey] focus:border-[blueviolet] border-solid focus:outline-0"
                  rows={1}
                  value={formState.content}
                  onChange={handleChange("content")}
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="inline-block w-[20%]">{AUTHOR}</label>
                <input
                  className="w-[70%] border-0 border-b border-[lightgrey] focus:border-[blueviolet] border-solid focus:outline-0"
                  type="text"
                  value={formState.author}
                  onChange={handleChange("author")}
                  required
                />
              </div>
              <div className="flex justify-end mt-8">
                <input
                  className="py-2 px-4 text-sm font-bold bg-[aliceblue] rounded-[5px] border-0 cursor-pointer"
                  type="submit"
                  value={ADD_POST}
                />
              </div>
            </form>
          </>
        )}
      </Modal>
    </>
  );
};

export default Tool;
