
const sidebarArea = document.getElementById('sidebar');
const projectArea = document.getElementById('project-area');
const trendArea = document.getElementById('trend-area');
const announceArea = document.getElementById('announce-area');
const smUserArea = document.getElementById('sm-user-area');
const lgUserArea = document.getElementById('lg-user-area')

const THUMBS_UP_URL = 'img/thumbs_up.png';
const REACTION_URL = 'img/reaction.png'
const SHARE_URL = 'img/share.png';

const importJson = (filepath) => {
  return fetch(filepath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(projectsData => {
    // Use the JSON data
    return projectsData
    // Call a function or trigger an event after loading the data if needed
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });  
}

importJson('./navigation.json').then(
  res => {
    const headerArea = document.createElement('div');
    headerArea.className = 'sidebar-separator';
    const navArea = document.createElement('div');
    navArea.className = 'sidebar-separator';
    const footerArea = document.createElement('div');
    footerArea.className = 'sidebar-separator';
    let currentArea = headerArea;
    res.map((item) => {
      const menuItem = document.createElement('div');
      const labelSpan = document.createElement('span');
      const menuIcon = document.createElement('img');
      labelSpan.textContent = item.label;
      const url = item.url === 'img/dashboard.png'
        ? item.url
        : item.url.replace('.png', '-white.png');
      menuIcon.src = url;
      menuIcon.width = item.url === 'img/dashboard.png'
        ? 30
        : 20;
      menuItem.appendChild(menuIcon)
      menuItem.appendChild(labelSpan);
      if (url.includes('home')) {
        sidebarArea.appendChild(headerArea);
        currentArea = navArea;

      } else if (url.includes('settings')) {
        sidebarArea.appendChild(navArea);
        currentArea = footerArea;
      }
      currentArea.appendChild(menuItem);
      if (url.includes('privacy'))
        sidebarArea.appendChild(footerArea);
    })
  }
);

importJson('./projects.json').then(
  res => {
    fillUserArea(res.trending, 'sm');
    fillUserArea(res.trending, 'lg')
    fillProjects(res.projects);
    fillAnnounces(res.announcements);
    fillTrends(res.trending);
  }
);

const fillUserArea = (trends, area) => {
  const user = trends[0];
  const userIcon = document.createElement('img');
  userIcon.src = user.url;
  const userText = document.createElement('div');
  userText.className = 'user-text';
  (area === 'sm') 
  ? userText.textContent = user.name
  : userText.textContent = `${user.name} (@${user.user})`;
  if (area === 'sm') {
    userIcon.width = 30;
    smUserArea.appendChild(userIcon);
    smUserArea.appendChild(userText);
  } else {
    userIcon.width = 50;
    const welcomeText = document.createElement('div');
    welcomeText.className = 'welcome-text';
    welcomeText.textContent = 'Hello there.'
    const welcomeUserArea = document.createElement('div');
    welcomeUserArea.className = 'welcome-text-user';
    welcomeUserArea.appendChild(welcomeText)
    welcomeUserArea.appendChild(userText);
    lgUserArea.appendChild(userIcon)
    lgUserArea.appendChild(welcomeUserArea);
  }



}
const fillProjects = (projects) => {
  return projects.map(project => {
    const pEntry = document.createElement('div');
    pEntry.className = 'project-entry';
    const pTitle = document.createElement('h3');
    pTitle.className = 'project-title';
    pTitle.textContent = project.title;
    const pDesc = document.createElement('div');
    pDesc.className = 'project-desc';
    pDesc.textContent = project.description;
    pEntry.appendChild(pTitle);
    pEntry.appendChild(pDesc);
    addBtmRtIcons(pEntry);
    projectArea.appendChild(pEntry);
  })
}

const addBtmRtIcons = (entry) => {
  const actionArea = document.createElement('div');
  actionArea.className = 'project-action-area';
  [THUMBS_UP_URL, REACTION_URL, SHARE_URL].map(imgUrl => {
    const imgObj = document.createElement('img');
    imgObj.className = 'project-action-icon';
    imgObj.src = imgUrl;
    imgObj.width = 20;
    actionArea.appendChild(imgObj)
  })
  entry.appendChild(actionArea);
}

const fillAnnounces = (announces) => {
  return announces.map(announce => {
    const aEntry = document.createElement('div');
    aEntry.className = 'announce-entry'
    const aTitle = document.createElement('h4');
    aTitle.textContent = announce.title;
    const aDesc = document.createElement('p');
    aDesc.textContent = announce.description;
    aEntry.appendChild(aTitle)
    aEntry.appendChild(aDesc);
    announceArea.appendChild(aEntry)
  })
}

const fillTrends = (trends) => {
  return trends.map(trend => {
    const trendEntry = document.createElement('div')
    trendEntry.className = 'trend-entry';
    const trendText = document.createElement('div')
    trendText.className = 'trend-text';
    const trendIcon = document.createElement('img')
    trendIcon.width = 50;
    trendIcon.className = 'trend-icon';
    trendIcon.src = trend.url;
    const trendTag = document.createElement('div')
    trendTag.className = 'trend-tag';
    trendTag.textContent = `@${trend.user}`;
    const trendDesc = document.createElement('div')
    trendDesc.className = 'trend-desc';
    trendDesc.textContent = trend.description;
    trendText.appendChild(trendTag);
    trendText.appendChild(trendDesc);
    trendEntry.appendChild(trendIcon);
    trendEntry.appendChild(trendText);
    trendArea.appendChild(trendEntry);
  })
}

const createEl = ({type, img, className, textContent}) => {

}