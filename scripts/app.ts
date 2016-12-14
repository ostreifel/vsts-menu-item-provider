let callCount = 0;

// will be recomputed each time the work item changes
const menuContributionHandler: IContributedMenuSource = {
    getMenuItems: function (context): (IContributedMenuItem & {dynamic?: boolean})[] {
        // could also be a promise  
        return [{
            title: "Menu Items Group",
            text: `Menu item Name 1, generated ${++callCount} times`,
            disabled: callCount % 3 === 0,
            action: context => alert("executing my action"),
            // icon: "img/icon.png",
            dynamic: true
        }];
    }
};

VSS.register(VSS.getContribution().id, menuContributionHandler);
