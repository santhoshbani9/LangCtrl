import { CONFIG_PATH, WIZARD_SCENE_IDS } from '../../constants';
import { Wizard, WizardStep, Ctx } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { SceneContext } from '../../interfaces';

@Wizard(WIZARD_SCENE_IDS.TUNE_SCENE)
export class TunerWizard {
  private readonly logger: Logger = new Logger(TunerWizard.name);
  private readonly configPath = CONFIG_PATH;

  constructor() {}

  @WizardStep(1)
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    this.logger.log('Tuner wizard entered');

    await ctx.reply(
      '🔧 *Tuner Mode*\n\nThis feature is under development. Coming soon!',
      {
        parse_mode: 'Markdown',
      },
    );

    await ctx.scene.leave();
  }
}
