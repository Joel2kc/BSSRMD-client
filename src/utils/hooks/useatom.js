import { useRecoilState } from "recoil";

export default function useAtom(atom) {
  const [state, setState] = useRecoilState(atom);

  return {
    setState(data) {
      setState({
        ...state,
        ...data,
      });
    },

    getState() {
      return state;
    },

    state,
  };
}
