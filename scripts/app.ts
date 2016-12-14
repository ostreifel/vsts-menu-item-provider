let callCount = 0;

// will be recomputed each time the work item changes
const menuContributionHandler: IContributedMenuSource = {
    getMenuItems: function (context): (IContributedMenuItem & {dynamic?: boolean})[] {
        // could be a promise instead
        return [{
            title: "Menu Items Group",
            text: `Menu item Name 1, generated ${++callCount} times`,
            // icon: "img/icon.png",
            dynamic: true
        }];
    }
};

VSS.register(VSS.getContribution().id, menuContributionHandler);