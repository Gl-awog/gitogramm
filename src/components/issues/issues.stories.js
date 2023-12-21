import Issues from "./Issues.vue";

export default {
  title: "Issues",
  components: {
    Issues,
  },
};

export const defaultView = () => ({
  components: {
    Issues,
  },
  data() {
    return {
      mok: [
        { user: { login: "user1" }, title: "text1" },
        { user: { login: "user2" }, title: "text2" },
      ],
      isIssuesLoading: false,
    };
  },
  template: '<Issues comments="this.mok" isLoading="isIssuesLoading" />',
});

defaultView.story = {
  name: "Стандартный вид",
};
