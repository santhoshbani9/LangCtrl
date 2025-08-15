import { Wizard, WizardStep, Ctx } from 'nestjs-telegraf';
import { WIZARD_SCENE_IDS } from '../../constants';
import { Logger } from '@nestjs/common';
import { SceneContext } from '../../interfaces';

@Wizard(WIZARD_SCENE_IDS.REPORT_SCENE)
export class ReportWizard {
  private readonly logger: Logger = new Logger(ReportWizard.name);

  constructor() {}

  @WizardStep(1)
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    this.logger.log('Report wizard entered');

    await ctx.reply(
      '📊 *Report Generator*\n\nThis feature is under development. Coming soon!',
      {
        parse_mode: 'Markdown',
      },
    );

    await ctx.scene.leave();
  }
}
