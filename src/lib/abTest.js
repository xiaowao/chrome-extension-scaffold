// ab测试

export default class ABtest {
  constructor (id, groups) {
    var guid = localStorage.getItem('guid')
    if (guid) {
      this[init](id, groups, guid)
    } else {
      chrome.environment.getMachineGuid(res => {
        localStorage.setItem('guid', res)
        this[init](id, groups, res)
      })
    }
  }

  [init] (id, groups, guid) {
    var n = guid.slice(-1).charCodeAt()
    this.abtestGroupId = (n % groups) + 1
    this.abtestId = (id + 1000) * 1000 + this.abtestGroupId
  }

  getId () {
    return this.abtestId
  }

  getGroup () {
    return this.abtestGroup
  }

  isGroup (val) {
    return this.abtestGroup === val
  }
}