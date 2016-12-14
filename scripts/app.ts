let i = 0;
const menuContributionHandler: IContributedMenuSource = {
    getMenuItems: function (context): (IContributedMenuItem & {dynamic?: boolean})[] {
        function myAction(actionContext) {
            alert("Action called");
        }
        return [{
            title: "Menu Items Group",
            text: "Menu Items Group",
            // icon: "img/icon.png",
            childItems: [{
                title: `Menu item Name 1, called ${i++} times`,
                action: myAction
            }],
            dynamic: true
        }];
    }
};

VSS.register(VSS.getContribution().id, menuContributionHandler);