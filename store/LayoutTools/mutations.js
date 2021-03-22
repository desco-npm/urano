export const add = (state, tools) => {
  state.tools = { ...state.tools, ...tools, }
}