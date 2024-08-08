import { Textarea, Select, Option, Input } from "@material-tailwind/react";
import {
  categoriesOptions,
  itemConditionOptions,
} from "utils/constants/constants";

export default function FormField({
  title,
  description,
  itemCondition,
  location,
  category,
  trade,
  setTitle,
  setDescription,
  setItemCondition,
  setLocation,
  setCategory,
  setTrade,
}) {
  const handleTitleChange = (e) => {
    if (e.target.value.length <= 20) {
      setTitle(e.target.value);
    }
  };

  const handleLocationChange = (e) => {
    if (e.target.value.length <= 20) {
      setLocation(e.target.value);
    }
  };

  const handleTradeChange = (e) => {
    if (e.target.value.length <= 20) {
      setTrade(e.target.value);
    }
  };

  return (
    <>
      <Input
        type="text"
        value={title}
        placeholder="제목"
        label="제목"
        required
        onChange={handleTitleChange}
      />
      <Textarea
        value={description}
        label="설명란"
        rows={4}
        onChange={(e) => setDescription(e.target.value)}
      />{" "}
      <Input
        type="text"
        value={location}
        onChange={handleLocationChange}
        label="예) 서울시 광진구"
        placeholder="주소"
        required
      />
      <Input
        type="text"
        value={trade}
        placeholder="원하시는 아이템을 적어주세요"
        label="희망 교환 물건"
        required
        onChange={handleTradeChange}
      />
      <Select
        value={itemCondition}
        label="교환 물품 상태"
        onChange={(e) => setItemCondition(e)}
      >
        {itemConditionOptions.map((itemConditionOption) => (
          <Option
            key={itemConditionOption.value}
            value={itemConditionOption.value}
          >
            {itemConditionOption.label}
          </Option>
        ))}
      </Select>
      <Select
        value={category}
        label="카테고리"
        onChange={(e) => setCategory(e)}
      >
        {categoriesOptions.map((categoriesOption) => (
          <Option key={categoriesOption.value} value={categoriesOption.value}>
            {categoriesOption.label}
          </Option>
        ))}
      </Select>
    </>
  );
}
