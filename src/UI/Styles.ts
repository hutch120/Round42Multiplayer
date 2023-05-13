/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { CSSProperties } from 'react'
import { CGAColors } from '../Constants/CGAColors'

/**
 * Module:          Styles
 * Responsibility:  Styles used by the UI
 */

const base: CSSProperties = {
  display: 'flex'
}

const alignCenter: CSSProperties = {
  ...base,
  justifyContent: 'center',
  flexDirection: 'row'
}

const alignLeft: CSSProperties = {
  ...base,
  justifyContent: 'flex-start',
  flexDirection: 'row'
}

const defaultFont: CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 24
}

const disabledStyle: CSSProperties = {
  backgroundColor: CGAColors.lightGray,
  color: CGAColors.darkGray
}

export const root: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  minHeight: '100%'
}

export const page: CSSProperties = {
  ...defaultFont,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: CGAColors.lightBlue,
  paddingBottom: '1em',
  flex: 1,
  maxWidth: 1080
}

export const ingamePage: CSSProperties = {
  ...page,
  backgroundColor: 'transparent'
}

export const defaultContainer: CSSProperties = {
  ...alignLeft,
  maxWidth: 800,
  padding: 0,
  margin: 0
}

export const header: CSSProperties = {
  ...defaultContainer,
  ...alignCenter,
  ...defaultFont,
  color: CGAColors.lightCyan,
  fontSize: 24
}

export const textStyle: CSSProperties = {
  ...defaultFont,
  color: CGAColors.green
}

export const textEmphasisStyle: CSSProperties = {
  ...defaultFont,
  color: CGAColors.yellow
}

export const defaultTextContainer: CSSProperties = {
  ...textStyle,
  ...defaultContainer,
  flexDirection: 'column',
  padding: 50
}

export const optionsContainer: CSSProperties = {
  ...defaultTextContainer,
  alignItems: 'center'
}

export const buttonContainer: CSSProperties = {
  ...alignCenter,
  ...defaultFont,
  ...defaultContainer,
  alignItems: 'center'
}

export const tableStyle: CSSProperties = {
  ...defaultFont,
  borderCollapse: 'separate',
  borderSpacing: 0
}

export const tableCellStyle: CSSProperties = {
  ...textStyle,
  borderColor: CGAColors.darkGray,
  borderStyle: 'none',
  borderWidth: '0.01em',
  padding: 0,
  textAlign: 'center',
  minWidth: 120
}

export const tableTextCellStyle: CSSProperties = {
  ...tableCellStyle,
  padding: '0.1em 0.6em'
}

export const tableHeaderCellStyle: CSSProperties = {
  ...tableTextCellStyle,
  color: CGAColors.lightCyan
}

export const uiStyle: CSSProperties = {
  ...defaultFont,
  color: CGAColors.yellow
}

export const uiDisabledStyle: CSSProperties = {
  ...uiStyle,
  ...disabledStyle
}

export const uiHoverStyle: CSSProperties = {
  ...uiStyle,
  backgroundColor: CGAColors.yellow,
  color: CGAColors.blue
}

export const uiAffixStyle: CSSProperties = textStyle

export const buttonSeparator: CSSProperties = {
  ...textStyle,
  padding: '0 0.5em'
}

export const spacer: CSSProperties = {
  flex: 1
}
