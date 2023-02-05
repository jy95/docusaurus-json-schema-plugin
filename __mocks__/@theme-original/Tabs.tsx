// Dummy mock for the sake Jest doesn't wire internal Docusaurus packages
import React, { ReactElement, ReactNode } from "react"

interface TabItemProps {
  readonly children: ReactNode
  readonly value: string
  readonly default?: boolean
  readonly label?: string
  readonly hidden?: boolean
  readonly className?: string
  readonly attributes?: { [key: string]: unknown }
}

interface TabValue {
  readonly value: string
  readonly label?: string
  readonly attributes?: { [key: string]: unknown }
  readonly default?: boolean
}

type Props = {
  readonly children:
    | readonly ReactElement<TabItemProps>[]
    | ReactElement<TabItemProps>
  readonly defaultValue?: string | null
  readonly values?: readonly TabValue[]
}

export default function Tabs({
  children,
  defaultValue,
  values,
}: Props): JSX.Element {
  // Find out values & label
  const items: readonly {
    value: string
    label?: string
  }[] =
    values !== undefined
      ? values
      : Array.isArray(children)
      ? (children as ReactElement<TabItemProps>[]).map((c) => ({
          label: c.props.label,
          value: c.props.value,
        }))
      : [
          {
            label: (children as ReactElement<TabItemProps>).props.label,
            value: (children as ReactElement<TabItemProps>).props.value,
          },
        ]

  const [selectedTab, setSelectedTab] = React.useState(
    defaultValue || items[0].value
  )
  const childrenAsArray: ReactElement<TabItemProps>[] = Array.isArray(children)
    ? children
    : [children]

  return (
    <div className="tabs-container">
      <ul role="tablist" aria-orientation="horizontal" className="tabs">
        {items.map((item, idx) => {
          let isSelected = selectedTab === item.value
          return (
            <li
              onClick={() => setSelectedTab(item.value)}
              tabIndex={isSelected ? 0 : -1}
              aria-selected={isSelected}
            >
              {item.label || idx}
            </li>
          )
        })}
      </ul>
      <div>
        {childrenAsArray.map((c) => {
          return (
            <div role="tabpanel" hidden={c.props.value !== selectedTab}>
              {c}
            </div>
          )
        })}
      </div>
    </div>
  )
}
