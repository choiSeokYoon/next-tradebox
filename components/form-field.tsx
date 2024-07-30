import { Textarea, Select, Option, Input } from "@material-tailwind/react";

export default function FormField({
    title,
    description,
    itemCondition,
    location,
    category,
    trade,
    categories,
    setTitle,
    setDescription,
    setItemCondition,
    setLocation,
    setCategory,
    setTrade,
}) {
  return (
    <>
    <Input
      type="text"
      value={title}
      placeholder="제목"
      label="타이틀"
      required
      onChange={(e) => setTitle(e.target.value)}
    />
    <Textarea
      value={description}
      label="설명란"
      required
      rows={4}
      onChange={(e) => setDescription(e.target.value)}
    />
    <Input
      type="text"
      value={itemCondition}
      placeholder="물건의 상태를 간략하게 적어주세요"
      label="교환 물품 상태"
      required
      onChange={(e) => setItemCondition(e.target.value)}
    />
    <Input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      label="예) 서울시 광진구"
      placeholder="주소"
      required
    />
    <Select
      value={category}
      label="카테고리"
      required
      onChange={(e) => setCategory(e)}
    >
      {categories.map((cat) => (
        <Option key={cat.value} value={cat.value}>
          {cat.label}
        </Option>
      ))}
    </Select>
    <Input
      type="text"
      value={trade}
      placeholder="원하시는 아이템을 적어주세요"
      label="희망 교환 물건"
      required
      onChange={(e) => setTrade(e.target.value)}
    />
  </>
);
};

