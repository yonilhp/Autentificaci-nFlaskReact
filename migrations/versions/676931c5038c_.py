"""empty message

Revision ID: 676931c5038c
Revises: 5273b5569660
Create Date: 2024-09-03 22:21:09.905536

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '676931c5038c'
down_revision = '5273b5569660'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=80), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=80), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###