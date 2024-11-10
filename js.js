const userService = {
  currentFilter: "active",
  users: [
    { name: "Alex", status: "active" },
    { name: "Sam", status: "deleted" },
  ],
  getFilterUsers: function () {
    return this.users.filter(function (user) {
      return user.status === this.currentFilter;
    });
  },
};
console.log(userService.getFilterUsers());
