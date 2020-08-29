import * as Bowser from 'bowser'

export const INITIAL_CONFIG = {
  duration: 10 * 1000,
  waitingDuration: 0,
  cuttedDuration: 0,
  maxLoop: 0,
  infiniteLoop: false,
  invalid: false,
  soundDuration: 10 * 1000,
}

export const INTIAL_STATE = {
  duration: 0,
  coutingTimerId: 1,
  counting: false,
  loop: 0,
}

type DeepPartial < T > = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

function measurementInterval () {
  const MEAN_INTERVAL_IN_MS = 5 * 60 * 1000 // 5 分
  return -Math.log(Math.random()) * MEAN_INTERVAL_IN_MS
}

type AppState = {
  configInUse: typeof INITIAL_CONFIG,
  state: typeof INTIAL_STATE;
}

// メモリの測定結果と合わせて送信したいアプリケーションの状態を管理するクラス
class AppStateManager {
  private currentState: AppState;
  constructor () {
    this.currentState = {
      configInUse: { ...INITIAL_CONFIG },
      state: { ...INTIAL_STATE },
    }
  }
  updateState (newState: DeepPartial<AppState>) {
    this.currentState = {
      configInUse: {
        ...this.currentState.configInUse,
        ...newState.configInUse,
      },
      state: {
        ...this.currentState.state,
        ...newState.state,
      },
    }
  }
  getCurrentState (): AppState {
    return this.currentState
  }
}

export const appStateManager = new AppStateManager()

class MemoryMeasurementScheduler {
  appStateManager: AppStateManager;
  bower: Bowser.Parser.ParsedResult;

  constructor (appStateManager: AppStateManager) {
    this.appStateManager = appStateManager
    this.bower = Bowser.parse(window.navigator.userAgent)
  }

  private async measureAndReportMemory () {
    if (!performance.measureMemory) return
    try {
      // NOTE: 仕様では measureMemory を呼び出してからGCが発生するまでの時間に関する規定は一切無く、
      // ブラウザごとにタイミングも異なる。つまり、GCの呼び出しがいつ行われても問題ないよう
      // measureMemory の呼び出し側の実装には注意する必要がある。ちなみに Chrome 84 は measureMemory を
      // 呼び出した 10 秒後にGCを実行し、Promise が resolve される実装になっている。
      const memoryMeasurement = await performance.measureMemory()
      const appState = appStateManager.getCurrentState()
      const reportEntry = {
        memoryMeasurement,
        bowser: this.bower,
        ...appState,
      }
      console.log(reportEntry) // TODO: send entry
    } catch (error) {
      if (error instanceof DOMException &&
          error.name === 'SecurityError') {
        console.log('The context is not secure.')
      } else {
        throw error
      }
    }
  }

  // 定期的にメモリ使用量の測定を行うようスケジューラーをセットする。
  // 測定はおおよそ 5 分間隔で行われる。
  // ただし素朴に 5 分おきに測定するとページにアクセスしてから 0 〜 5分経過した際のデータが集計されず、
  // データに偏りが発生してしまう。そこで、ここではポアソン分布を利用して測定のタイミングを分散させ、
  // どの経過時間においても同じ確率でメモリ使用量の測定が実行されるようにしている。
  start () {
    if (!performance.measureMemory) return

    console.log('start measurement scheduler')

    const scheduleMeasurement = () => {
      const interval = measurementInterval()
      console.log('Scheduling memory measurement in ' + Math.round(interval / 1000) + ' seconds.')
      window.setTimeout(() => {
        this.measureAndReportMemory()
        scheduleMeasurement()
      }, interval)
    }
    scheduleMeasurement()
  }
}

export const memoryMeasurementScheduler = new MemoryMeasurementScheduler(appStateManager)
