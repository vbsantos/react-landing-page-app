import { render, screen, fireEvent } from "test-utils";
import Accordion from "./Accordion";
import AccordionGroup from "./AccordionGroup";

const title = "Accordion Title";

const renderGroup = (n) => {
  const accordions = [];

  for (let i = 0; i < n; i++) {
    accordions.push(
      <Accordion key={i} title={`Title ${i}`}>{`Child ${i}`}</Accordion>
    );
  }

  return render(<AccordionGroup>{accordions}</AccordionGroup>);
};

test("renders with child", () => {
  render(
    <AccordionGroup>
      <Accordion title={title} />
    </AccordionGroup>
  );
  expect(screen.getByText(title)).toBeInTheDocument();
});

test("renders with 3 children", () => {
  render(
    <AccordionGroup>
      <Accordion title={title} />
      <Accordion title={title} />
      <Accordion title={title} />
    </AccordionGroup>
  );
  expect(screen.getAllByText(title)).toHaveLength(3);
});

test("renders with all accordions closed", () => {
  renderGroup(3);

  expect(screen.queryByText("Child 0")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 2")).not.toBeInTheDocument();
});

test("opens accordion with click", () => {
  renderGroup(5);

  fireEvent.click(screen.getByText("Title 4"));

  expect(screen.queryByText("Child 0")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 2")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 3")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 4")).toBeInTheDocument();
});

test("closes open accordion with click", () => {
  renderGroup(3);

  fireEvent.click(screen.getByText("Title 1"));

  expect(screen.queryByText("Child 0")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 1")).toBeInTheDocument();
  expect(screen.queryByText("Child 2")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Title 1"));

  expect(screen.queryByText("Child 0")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
  expect(screen.queryByText("Child 2")).not.toBeInTheDocument();
});
